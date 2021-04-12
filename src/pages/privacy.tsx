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
import { GetStaticProps } from 'next';
import { PageProps } from '@lib/types';
import { getPrivacy } from '@lib/cms-api';
import RichText from '@components/RichText';
import Script from '@components/Script';
import Heading from '@components/Heading';
import styles from './styles.module.scss';
import cn from 'classnames';

interface Props extends PageProps {
  content: string;
}

export default function Privacy({ settings, content }: Props) {
  const heading = {
    hero: settings?.title ?? null,
    description: settings?.description ?? null
  };

  return (
    <div className={cn(styles.privacy, styles.container)}>
      <Heading {...heading} />
      {content && <RichText text={content} />}
      <Script
        className={styles.iframe}
        attribs={{
          id: 'CookieDeclaration',
          src: 'https://consent.cookiebot.com/609a66e2-0531-441d-b473-6cbd335dd21e/cd.js',
          type: 'text/javascript',
          async: ''
        }}
      />
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await getPrivacy();

  return {
    props: {
      settings: {
        type: 'cookie',
        ...data?.settings
      },
      content: data?.content
    },
    revalidate: 60
  };
};
