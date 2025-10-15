// Team Avatar URLs from a free avatar library
export const TEAM_AVATARS = [
  "https://api.dicebear.com/7.x/bottts/svg?seed=team1",
  "https://api.dicebear.com/7.x/bottts/svg?seed=team2",
  "https://api.dicebear.com/7.x/bottts/svg?seed=team3",
  "https://api.dicebear.com/7.x/bottts/svg?seed=team4",
  "https://api.dicebear.com/7.x/bottts/svg?seed=team5",
  "https://api.dicebear.com/7.x/identicon/svg?seed=team6",
  "https://api.dicebear.com/7.x/identicon/svg?seed=team7",
  "https://api.dicebear.com/7.x/identicon/svg?seed=team8",
  "https://api.dicebear.com/7.x/identicon/svg?seed=team9",
  "https://api.dicebear.com/7.x/identicon/svg?seed=team10",
  "https://api.dicebear.com/7.x/shapes/svg?seed=team11",
  "https://api.dicebear.com/7.x/shapes/svg?seed=team12",
  "https://api.dicebear.com/7.x/shapes/svg?seed=team13",
  "https://api.dicebear.com/7.x/shapes/svg?seed=team14",
  "https://api.dicebear.com/7.x/shapes/svg?seed=team15",
  "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=team16",
  "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=team17",
  "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=team18",
  "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=team19",
  "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=team20",
  "https://api.dicebear.com/7.x/rings/svg?seed=team21",
  "https://api.dicebear.com/7.x/rings/svg?seed=team22",
  "https://api.dicebear.com/7.x/rings/svg?seed=team23",
  "https://api.dicebear.com/7.x/rings/svg?seed=team24",
  "https://api.dicebear.com/7.x/rings/svg?seed=team25",
  "https://api.dicebear.com/7.x/thumbs/svg?seed=team26",
  "https://api.dicebear.com/7.x/thumbs/svg?seed=team27",
  "https://api.dicebear.com/7.x/thumbs/svg?seed=team28",
  "https://api.dicebear.com/7.x/thumbs/svg?seed=team29",
  "https://api.dicebear.com/7.x/thumbs/svg?seed=team30",
];

export const getRandomAvatar = () => {
  const randomIndex = Math.floor(Math.random() * TEAM_AVATARS.length);
  return TEAM_AVATARS[randomIndex];
};
