/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { APIResponse, expect, request } from '@playwright/test';

export async function createNewCourse(payload: object): Promise<APIResponse> {
  const api = await request.newContext();
  const response = await api.post('/courses', {
    data: payload,
  });

  expect(response.status()).toBe(201);
  return response;
}
