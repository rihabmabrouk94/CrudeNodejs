const models = require("../models/index");
const validor = require("../helpers/validor");

const coursesModel = models['Course'];
const chapterModel = models['Chapter'];

module.exports = {
    list(req, res) {
        chapterModel.findAll({
            include: [{
                model: coursesModel,
                as: 'course'
            }],
        })
            .then(resultQuery => {
                res.send({
                    data: resultQuery,
                    success: true,
                    messages: [{
                        code: "01",
                        message: "chapter.GetAllWithSuccess"
                    }]
                });
            });
    },

    getByIdChapter(req, res) {
        let idChapter = req.params.id;

        /*if (!validor.validate_number(idChapter)) {
            return res.send({
                status: false,
                message: "invalid"
            });

            chapterModel.findOne({
            where: {
                chapter_id: idChapter
            },
            include: [{
                model: coursesModel,
                as: 'course'
            }],
        }).then(function (resultQuery) {
            if (!resultQuery) {
                return res.status(404).send({
                    message: 'chapter Not Found',
                });
            }

            return res.status(200).send(resultQuery);
        }).catch((error) => res.status(500).send(error));
        }*/

        validor.validate_number_with_promise(idChapter).then(validation => {
            if (validation === true) {
                chapterModel.findOne({
                    where: {
                        chapter_id: idChapter
                    },
                    include: [{
                        model: coursesModel,
                        as: 'course'
                    }],
                }).then(function (resultQuery) {
                    if (!resultQuery) {
                        return res.status(404).send({
                            message: 'chapter Not Found',
                        });
                    }

                    return res.status(200).send(resultQuery);
                }).catch((error) => res.status(500).send(error));
            } else {
                return res.status(404).send({
                    message: 'chapter Not Found',
                });
            }
        });

    },

    add(req, res) {
        // tester si le body du post envoyé contient les deux champs description and name : tu peux rajouter un test pour les champs vides ou le champ name qui dépasse les 25 lettres
        if (req.body && req.body.chapter_name && req.body.chapter_name.length > 0) {

            // tester si le course existe deja dans notre table
            chapterModel.findOne({
                where: {
                    chapter_name: req.body.chapter_name,
                }
            }).then(findedChapter => {
                // si le retour de find one contient un resultat: on n insere pas les données
                if (findedChapter) {
                    return res.status(405).send({
                        success: false,
                        data: findedChapter,
                        message: "Course already exists"
                    });
                } else {
                    chapterModel.create({
                        chapter_name: req.body.chapter_name,
                        course_id: req.body.course_id,
                    })
                        .then((Chapter) => {
                            res.status(201).send({
                                data: Chapter,
                                status: true,
                                message: "Course created with success"
                            })
                        })
                        .catch((error) => res.status(400).send(error));
                }
            });
        } else {
            return res.status(405).send({
                success: false,
                message: "Please add chapter_name and course_id"
            });
        }
    },

    update: function (req, res) {
        let idChapter = req.params.id;

        chapterModel.findOne({
            where: {
                chapter_id: idChapter
            }
        })
            .then(findersQuery => {
                if (!findersQuery) {
                    return res.status(404).send({
                        message: 'chapter Not Found',
                        status: false,
                    });
                } else {
                    findersQuery.update({
                        chapter_name: req.body.chapter_name
                    })
                        .then((Chapter) => {
                            res.status(200).send({status: 'Updated' + req.body.chapter_name, data: Chapter})
                        })
                        .catch((error) => res.status(400).send(error));
                }
            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        let idChapter = req.params.id;

        chapterModel.findOne({
            where: {
                chapter_id: idChapter
            }
        }).then(function (resultQuery) {
            if (!resultQuery) {
                return res.status(404).send({
                    message: 'Chapter Not Found',
                });
            }

            resultQuery.destroy()
                .then(() => res.status(204).send({
                    status: 'destroy',
                    message: 'your chapter has been deleted'

                }))
                .catch((error) => res.status(400).send(error));
        }).catch((error) => res.status(400).send(error));

    },
};



