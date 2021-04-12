import { fetchCmsAPI } from '@lib/cms-provider/utils';
import { Job, Perk, Privacy } from '@lib/types';

export async function getAllJobs(): Promise<Job[]> {
  const data = await fetchCmsAPI(`
    {
      jobs {
        id
        companyName
        title
        description
        link
        discord
        rank
      }
    }
  `);

  return data.jobs;
}

export async function getAllPerks(): Promise<Perk[]> {
  const data = await fetchCmsAPI(`
    {
      perks {
        id
        companyName
        title
        description
        link
        rank
      }
    }
  `);

  return data.perks;
}

export async function getPrivacy(): Promise<Privacy> {
  const data = await fetchCmsAPI(
    `
    query {
      privacy {
        settings {
          title
          description
          metaTitle
          metaDescription
        }
        content
      }
    }
  `
  );

  return data?.privacy;
}
