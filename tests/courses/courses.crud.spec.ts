/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { expect, test } from '@fixtures/api.fixture';
import { createNewCourse } from '@requests/courses/create.course.request';
import { deleteCreatedCourse } from '@requests/courses/delete.course.request';
import { updateNewCourse } from '@requests/courses/patch.course.request';
import { readCourseByIdRequest, readNonExistingCourseByIdRequest } from '@requests/courses/read.course.request';

test.describe('CRUD /courses', () => {
  const newCourse = {
    title: 'Advanced JavaScript',
    instructorId: 'abc123',
    duration: '10 weeks',
    category: 'Web Development',
    description: 'A deep dive into advanced JavaScript concepts.',
  };
  const updatedCourse = {
    duration: '12 weeks',
  };
  let id: string;

  test('should perform full CRUD actions for new course', async ({ log }) => {
    await test.step('Create new course', async () => {
      const response = await createNewCourse(newCourse);
      const responseData = await response.json();
      id = responseData.id;
      log.info(responseData);
    });
    await test.step('Get created course', async () => {
      const response = await readCourseByIdRequest(id);
      const responseData = await response.json();
      expect(responseData).toMatchObject(newCourse);
    });
    await test.step('Edit by PATCH method created course', async () => {
      const response = await updateNewCourse(updatedCourse, id);
      const responseData = await response.json();

      expect(responseData).toHaveProperty('duration', updatedCourse.duration);
      log.info(responseData);
    });
    await test.step('should delete new course', async () => {
      await deleteCreatedCourse(id);
    });
    await test.step('should verify that course is deleted', async () => {
      const response = await readNonExistingCourseByIdRequest(id);
      expect(response.status()).toBe(404);
      log.info(`Not found course with ID: ${id}`);
    });
  });
});
