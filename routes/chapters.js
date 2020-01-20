const router = require('express').Router();

const  chapterController = require('./../controllers/chaptersController');

router.get('/list', function (req, res, next) {
    chapterController.list(req, res, next);
});
router.get('/:id', function (req, res, next) {
    chapterController.getByIdChapter(req, res, next)
});
router.post('/add', function (req, res, next) {
    chapterController.add(req, res, next)
});
router.put('/:id', function (req, res, next) {
    chapterController.update(req, res, next);
});
router.delete('/delete/:id', function (req, res, next) {
    chapterController.delete(req, res, next);
});

module.exports = router;
