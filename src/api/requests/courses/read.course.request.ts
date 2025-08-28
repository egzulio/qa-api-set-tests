/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { APIResponse, expect, request } from '@playwright/test';

export async function readCourseByIdRequest(id: string): Promise<APIResponse> {
  const api = await request.newContext();
  const response = await api.get(`/courses/${id}`);
  expect(response.status()).toBe(200);
  return response;
}

export async function readNonExistingCourseByIdRequest(id: string): Promise<APIResponse> {
  const api = await request.newContext();
  const response = await api.get(`/courses/${id}`);
  expect(response.status()).toBe(404);
  return response;
}
