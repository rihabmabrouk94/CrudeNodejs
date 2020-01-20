const router = require('express').Router();
const  coursesController = require('./../controllers/coursesController');

router.get('/list', function (req, res, next) {
    coursesController.list(req, res, next);
});
router.get('/:id', function (req, res, next) {
    coursesController.getById(req, res, next)
});
router.post('/add', function (req, res, next) {
    coursesController.add(req, res, next)
});
router.put('/:id', function (req, res, next) {
    coursesController.update(req, res, next);
});
router.delete('/delete/:id', function (req, res, next) {
    coursesController.delete(req, res, next);
});

module.exports = router;
