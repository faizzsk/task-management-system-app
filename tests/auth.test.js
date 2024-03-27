
const request = require('supertest');
const app = require('../index'); 
const mongoose = require('mongoose');
const User = require('../models/User');
//Not working
jest.mock('../services/auth.service', () => ({
  registerUser: jest.fn(),
}));
describe('Authentication API Tests', () => {
  // MongoDB setup
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/task_management', {
      useNewUrlParser: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // Test case for registering a new user
  it('should register a new user', async () => {
    // Define a sample user object for registration
    const newUser = {
      username: 'testuser',
      password: 'testpassword',
    };

    const { registerUser } = require('../services/authService');
    registerUser.mockResolvedValue('User registered Successfully');

    const response = await request(app)
      .post('/api/auth/register')
      .send(newUser);

    expect(response.status).toBe(201);

    expect(response.body).toEqual({ message: 'User registered Successfully' });

    const savedUser = await User.findOne({ username: newUser.username });
    expect(savedUser).toBeDefined();
    expect(savedUser.username).toBe(newUser.username);
  });

});
