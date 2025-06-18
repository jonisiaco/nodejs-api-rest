import connect from '../db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';

const usersCollection = async () => {
  const db = await connect();
  return db.collection('users');
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    const users = await usersCollection();
    const user = await users.findOne({ username });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
};

export const register = async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const users = await usersCollection();

  await users.insertOne({ username, password: hash });
  res.status(201).json({ message: 'User created' });
};

export const updateUsername = async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const _id = { _id: new ObjectId(id) };
    const username = { $set: body };
    const users = await usersCollection();

    await users.updateOne(_id, username);
    res.json({ message: 'User updated' });
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    const _id = { _id: new ObjectId(id) };
    const users = await usersCollection();

    await users.deleteOne(_id);
    res.json({ message: 'User deleted' });
};

export const getUser = async (req, res) => {
  try {
    const users = await usersCollection();
    const items = await users.find().toArray();
    res.status(200).json(items);

  } catch (error) {

    res.status(500).json({ error: 'Error fetching items' });
  }
};
