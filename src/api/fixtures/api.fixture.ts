import { test as base } from '@playwright/test';
import { ILogObj, Logger } from 'tslog';

interface LogFixture {
  log: Logger<ILogObj>;
}

export const test = base.extend<LogFixture>({
  // eslint-disable-next-line no-empty-pattern
  log: async ({}, use) => {
    const logger = new Logger<ILogObj>();
    await use(logger);
  },
});

export { expect } from '@playwright/test';
