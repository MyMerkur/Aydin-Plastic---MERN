const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/superUser');
require('dotenv').config();

exports.register = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Bu Email zaten kayıtlı.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_Secret_Key, { expiresIn: '1h' });

        res.status(201).json({ message: 'Kayıt Başarılı', token });
    } catch (error) {
        console.error('Kayıt Hatası:', error);
        res.status(500).json({ message: 'Kayıt Sırasında bir sorun oluştu.' });
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Bu email ile daha önce bir kayıt oluşturulmuş' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Hatalı Şifre' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_Secret_Key, { expiresIn: '1h' });
        res.status(200).json({ message: 'Giriş Başarılı', token });
    } catch (error) {
        console.error('Giriş Hatası:', error);
        res.status(500).json({ message: 'Giriş sırasında bir hata oluştu' });
    }
};

exports.logout = async (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Oturum kapatılamadı:', err);
            return res.status(500).json({ message: 'Oturum kapatılamadı' });
        }
        res.clearCookie('connect.sid', { path: '/' }); 
        res.status(200).json({ message: 'Başarıyla çıkış yapıldı' });
    });
};