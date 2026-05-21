export const defaultUserProfile = {
  name: 'Traveler',
  focus: 'wellness',
  experience: 14,
  preferences: {
    tone: 'encouraging',
    challenge: 'moderate',
  },
};

export function updateUserModel(profile, updates) {
  return {
    ...profile,
    ...updates,
    lastUpdated: new Date().toISOString(),
  };
}
