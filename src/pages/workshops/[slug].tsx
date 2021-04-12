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

import { GetStaticProps, GetStaticPaths } from 'next';
import { getAllWorkshops, getWorkshop } from '@lib/cms-api';
import { PageProps, Workshop } from '@lib/types';
import WorkshopSection from '@components/WorkshopSection';
import styles from '../styles.module.scss';

interface Props extends PageProps {
  workshop: Workshop;
}

export default function WorkshopPage({ workshop }: Props) {
  return <div className={styles.container}>{<WorkshopSection workshop={workshop} />}</div>;
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;
  const workshop = await getWorkshop(slug);

  if (!workshop) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      workshop,
      settings: {
        ...workshop?.settings,
        type: 'workshops'
      }
    },
    revalidate: 60
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const workshops = await getAllWorkshops();
  const slugs = workshops.map((w: Workshop) => ({ params: { slug: w.slug } }));

  return {
    paths: slugs,
    fallback: false
  };
};
