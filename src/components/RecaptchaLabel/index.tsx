/**
 * Copyright 2020 Vercel Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import styles from './styles.module.scss';
import classnames from 'classnames/bind';
const cn = classnames.bind(styles);

interface Props {
  className?: string;
  forwardRef?: any;
}

export default function RecaptchaLabel({ className, forwardRef }: Props) {
  return (
    <p ref={forwardRef} className={cn(className, styles.recaptchaLabel)}>
      This site is protected by reCAPTCHA and the Google{' '}
      <a href="https://policies.google.com/privacy">Privacy Policy</a> and{' '}
      <a href="https://policies.google.com/terms">Terms of Service</a> apply.
    </p>
  );
}
