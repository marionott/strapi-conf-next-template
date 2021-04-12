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

import { Sponsor } from '@lib/types';
import SponsorRow from './SponsorRow';
import styles from './styles.module.scss';

type Props = {
  sponsors: Sponsor[];
};

interface SortedSponsors {
  [key: string]: Sponsor[];
}

export default function SponsorsGrid({ sponsors }: Props) {
  const sortedSponsors = sponsors
    .sort((a, b) => Number(a.tierRank) - Number(b.tierRank))
    .reduce((groups: SortedSponsors, entry: Sponsor) => {
      groups[entry.tier] = groups[entry.tier] ?? [];
      groups[entry.tier].push(entry);
      return groups;
    }, {});

  return (
    <div>
      {Object.keys(sortedSponsors).map((tier: string, index) => (
        <div key={index} className={styles.sponsorSection}>
          {sortedSponsors?.[tier] && (
            <SponsorRow
              key={tier}
              tier={tier}
              className={styles.grid}
              sponsors={sortedSponsors?.[tier]}
            />
          )}
        </div>
      ))}
    </div>
  );
}
