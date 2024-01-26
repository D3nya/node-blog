import mongoose from 'mongoose';

const contactSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: String,
});

export const Contact = mongoose.model('Contact', contactSchema);
