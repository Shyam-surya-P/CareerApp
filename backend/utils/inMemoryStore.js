import bcrypt from "bcryptjs";

// Simple in-memory fallback so the app runs without MongoDB.
// Data resets whenever the backend restarts.

const state = {
  usersByEmail: new Map(), // email -> { id, name, email, passwordHash }
  usersById: new Map(), // id -> same
  profilesByUserId: new Map(), // userId -> profile
  latestResultByUserId: new Map(), // userId -> result/dashboard
};

let nextId = 1;

function newId() {
  return String(nextId++);
}

export const inMemoryStore = {
  async createUser({ name, email, password }) {
    const id = newId();
    const passwordHash = await bcrypt.hash(password, 10);
    const user = { id, name, email, passwordHash };
    state.usersByEmail.set(email, user);
    state.usersById.set(id, user);
    return user;
  },

  async findUserByEmail(email) {
    return state.usersByEmail.get(email) || null;
  },

  async findUserById(id) {
    return state.usersById.get(id) || null;
  },

  async verifyPassword(user, password) {
    return bcrypt.compare(password, user.passwordHash);
  },

  async upsertProfile(userId, profile) {
    state.profilesByUserId.set(userId, { ...profile, userId });
    return state.profilesByUserId.get(userId);
  },

  async getProfile(userId) {
    return state.profilesByUserId.get(userId) || null;
  },

  async saveResult(userId, result) {
    state.latestResultByUserId.set(userId, { ...result, userId });
    return state.latestResultByUserId.get(userId);
  },

  async getLatestResult(userId) {
    return state.latestResultByUserId.get(userId) || null;
  },
};

