const Contact = require('../models/contacts');

exports.createContact = async (req, res) => {
    try {
      const { ad, soyad, email, telefon, mesaj } = req.body;
      const newContact = new Contact({ ad, soyad, email, telefon, mesaj });
      await newContact.save();
      res.status(201).json({ message: 'Mesaj başarıyla gönderildi.' });
    } catch (error) {
      res.status(500).json({ message: 'Mesaj gönderilemedi.', error });
    }
  };

  exports.getContacts = async (req, res) => {
    try {
      const contacts = await Contact.find();
      res.status(200).json(contacts);
    } catch (error) {
      res.status(500).json({ message: 'İletişim formları getirilemedi.', error });
    }
  };