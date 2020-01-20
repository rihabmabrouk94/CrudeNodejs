
const models = require("../models/index");

const coursesModel = models['Course'];
const chaptersModel = models['Chapter'];

module.exports = {
    list(req, res) {
        coursesModel.findAll({
            include: [{
                model: chaptersModel,
                as: 'chapters'
            }]
        }).then(resultQuery => {
            res.send({
                data: resultQuery,
                success: true,
                messages: [{
                    code: "01",
                    message: "Courses.GetAllWithSuccess"
                }]
            });
        });
    },

    getById(req, res) {
        let idCourse=req.params.id;

        coursesModel.findOne({
            where: {
                course_id : Number(idCourse)
            }
        }).then(function(resultQuery) {
            if (!resultQuery) {
                return res.status(404).send({
                    message: 'Courses Not Found',
                });
            }
            return res.status(200).send(resultQuery);
        }).catch((error) => res.status(500).send(error));

    },

    add(req, res) {
        // tester si le body du post envoyé contient les deux champs description and name : tu peux rajouter un test pour les champs vides ou le champ name qui dépasse les 25 lettres
        if (req.body && req.body.name && req.body.name.length > 0 && req.body.description) {

            // tester si le course existe deja dans notre table
            coursesModel.findOne({
                where: {
                    name: req.body.name,
                }
            }).then(findedCourse => {
                // si le retour de find one contient un resultat: on n insere pas les données
                if (findedCourse) {
                    return res.status(405).send({
                        success: false,
                        data: findedCourse,
                        message: "Course already exists"
                    });
                } else {
                    coursesModel.create({
                        name: req.body.name,
                        description: req.body.description,
                    })
                        .then((Course) => {
                            res.status(201).send({
                                data: Course,
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
                message: "Please add name and description"
            });
        }
    },

    update: function (req, res) {
        let idCourse=req.params.id;
        coursesModel.findOne({
            where: {
                course_id: idCourse
            }
        })
            .then(findersQuery => {
                if (!findersQuery) {
                    return res.status(404).send({
                        message: 'course Not Found',
                        status: false,
                    });
                }
                else {
                    findersQuery.update({
                        name:req.body.name,
                        description: req.body.description
                    })
                        .then((Chapter) => {
                            res.status(200).send({status: 'Updated'+ req.body.name, data: Chapter })
                        })
                        .catch((error) => res.status(400).send(error));
                }
            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        let course_id = req.params.id;

        coursesModel.findOne({
            where: {
                course_id : course_id
            }
        }).then(function(resultQuery) {
            if (!resultQuery) {
                return res.status(404).send({
                    message: 'Courses Not Found',
                });
            }

            resultQuery.destroy()
                .then(() => res.status(204).send({
                    status: 'destroy'
                }))
                .catch((error) => res.status(400).send(error));
        })
            .catch((error) => res.status(400).send(error));

    },
};

