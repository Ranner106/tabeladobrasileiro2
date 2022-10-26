import * as bcrypt from 'bcryptjs';

const encodePassword = (password: string): string => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};

const comparePasswords = (password: string, hash: string): boolean => (
  bcrypt.compareSync(password, hash));

export {
  encodePassword,
  comparePasswords,
};
