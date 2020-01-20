const router = require('express').Router();
const coursesRoute = require('./courses');
const chapterRoute = require('./chapters');

router.use("/courses" , coursesRoute);
router.use("/chapters" , chapterRoute);

module.exports = router;
