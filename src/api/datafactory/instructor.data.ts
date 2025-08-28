import { faker } from '@faker-js/faker';

interface InstructorData extends Record<string, unknown> {
  name: string;
  email: string;
  specialization: string;
  bio: string;
}

export function getRandomInstructorData(): InstructorData {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    specialization: faker.lorem.words(3),
    bio: faker.lorem.sentences(2),
  };
}
