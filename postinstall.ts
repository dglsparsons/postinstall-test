import { execSync } from 'child_process';
import { lt } from 'semver';
import { bgYellow, yellow, bgRed, red } from 'chalk';

let vercelVersion
try {
  // try a general `vercel -v`
  vercelVersion = execSync("vercel -v", { stdio: 'pipe' }).toString().trim();
} catch (e) {
  try {
    // If that failed, check for a locally installed package too.
    vercelVersion = execSync("$npm_execpath vercel -v", { stdio: 'pipe' }).toString().trim();
  } catch (e) {
    console.warn(bgYellow.black(" WARN "), yellow("No vercel installation found"));
    process.exit(0);
  }
}

if (lt(vercelVersion, '33.0.0')) {
  console.error(bgRed(" ERROR "), red(
    `Must have 'vercel' CLI installed with a version greater than 33.0.0. Found ${vercelVersion}`));
  process.exit(1);
}
