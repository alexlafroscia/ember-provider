import { VerificationConfig } from 'testdouble';

declare global {
  interface Assert {
    /**
     * Assert that a TestDouble function was invoked correctly
     */
    verify(a: any, check?: VerificationConfig): void;
  }
}
