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

import { GetStaticProps, GetServerSideProps } from 'next';
import { getAllWorkshops, getSettings } from '@lib/cms-api';
import { Workshop, PageProps } from '@lib/types';
import { EDITO } from '@lib/constants';
import Heading from '@components/Heading';
import styles from '../styles.module.scss';
import WorkshopGrid from '@components/WorkshopsGrid';

interface Props extends PageProps {
  workshops: Workshop[];
}

export default function Workshops({ workshops, settings }: Props) {
  const heading = {
    hero: settings?.title ?? EDITO.sponsors.title,
    description: settings?.description ?? settings?.metaDescription ?? ''
  };

  return (
    <div className={styles.container}>
      <Heading {...heading} />
      {workshops && <WorkshopGrid workshops={workshops} />}
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const type = 'workshops';
  const [workshops, settings] = await Promise.all([getAllWorkshops(), getSettings(type)]);

  return {
    props: {
      workshops,
      settings: {
        ...settings,
        type
      }
    },
    revalidate: 60
  };
};
