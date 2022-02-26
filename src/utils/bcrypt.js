import bcrypt from 'bcrypt';

export default {
  async hashString(arg = '') {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(`${arg}`, salt);
  },

  async compareString(arg = '', hashedString = '') {
    return bcrypt.compare(`${arg}`, `${hashedString}`);
  },
};
