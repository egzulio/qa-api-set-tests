/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/unbound-method */
import { getRandomInstructorData } from '@datafactory/instructor.data';
import { expect, test } from '@fixtures/api.fixture';
import { createNewInstructorRequest } from '@requests/instructors/create.instructor.request';
import { readInstructorByIdRequest } from '@requests/instructors/read.instructor.request';

test.describe('PUT /instructors/:id', () => {
  test('should create and update an instructor successfully', async ({ request, log }) => {
    let instructorId: string;

    const updatedInstructor = getRandomInstructorData();

    await test.step('Create a new instructor', async () => {
      const responseData = await (await createNewInstructorRequest()).json();

      instructorId = responseData.id;
    });

    await test.step('Update the instructor details', async () => {
      const updateResponse = await request.put(`/instructors/${instructorId}`, { data: updatedInstructor });
      expect(updateResponse.status()).toBe(200);

      const responseData = await updateResponse.json();

      expect(responseData).toMatchObject(updatedInstructor);
    });

    await test.step('Verify the updated instructor', async () => {
      const responseData = await (await readInstructorByIdRequest(instructorId)).json();

      expect(responseData).toMatchObject(updatedInstructor);
      log.info(responseData);
    });
  });
});
