import express from 'express';
import { follow, unFollow, getFollowers, getFollowersCount, getFollowingCount } from '../controller/follow.controller';
import { verifyJWT } from '../middleware/auth.middleware';
const router = express.Router();

router.get('/getFollowers/:username', verifyJWT, getFollowers);
router.get('/followers/count/:username', verifyJWT, getFollowersCount);
router.get('/following/count/:username', verifyJWT, getFollowingCount);
router.post('/follow', verifyJWT,  follow);
router.delete('/unfollow',verifyJWT, unFollow);

export default router;
