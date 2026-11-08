# Lasya Priya (Priyanka) & Naresh — Wedding Invitation

Updated Arena-based bilingual React/Vite wedding invitation.

## Included in this update
- Bride's name consistently shown as **Lasya Priya (Priyanka)**.
- Bride portrait mapped to the pink-saree individual photo; groom portrait mapped to the solo white-shirt photo.
- Couple portraits retained in the gallery.
- Bride-side family entries transcribed from the user's supplied invitation:
  - Smt. & Sri Pittala Laxmi – Ramesh Mudhiraj
  - Smt. & Sri Pittala Padma – Ravi Mudhiraj
- Groom-side family section removed completely.
- Closing wording simplified; no “Near & Dear” or “With best compliments” block.
- Audio extracted from the user's uploaded MP4 and added as `src/assets/music/wedding-song.mp3`; the existing music control uses it automatically.
- Existing Arena design and bilingual experience retained.

## Deploy
This is a Vite source project, not a directly openable HTML file.
Upload the contents of this ZIP to the existing GitHub repository, replacing the corresponding files and adding `src/assets/music/wedding-song.mp3`. Commit the changes. Vercel should automatically rebuild and deploy from the connected GitHub repository.

Build settings: `npm run build`; output directory: `dist`.
