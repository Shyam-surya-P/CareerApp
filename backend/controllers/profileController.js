import { isDbReady } from "../utils/isDbReady.js";
import { inMemoryStore } from "../utils/inMemoryStore.js";
import Profile from "../models/Profile.js";

// MVP: only in-memory profile until a Profile model is added.
// Works even when MongoDB is not configured.

export const getProfile = async (req, res) => {
  if (!isDbReady()) {
    const profile = await inMemoryStore.getProfile(req.user);
    return res.json(profile);
  }

  const profile = await Profile.findOne({ userId: req.user }).lean();
  return res.json(profile);
};

export const upsertProfile = async (req, res) => {
  const profile = req.body || {};

  if (!isDbReady()) {
    const saved = await inMemoryStore.upsertProfile(req.user, profile);
    return res.json(saved);
  }

  const saved = await Profile.findOneAndUpdate(
    { userId: req.user },
    { userId: req.user, ...profile },
    { upsert: true, new: true }
  ).lean();
  return res.json(saved);
};

