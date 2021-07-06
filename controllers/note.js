const Note = require("../models/note");

exports.list = async (req, res) => {
    try {
        const notes = await Note.find({});
        res.render("notes", {notes: notes});

    }catch (e) {
        res.status(404).send({message: "Could not list the note"})
    }
    };

    exports.delete = async (req, res) => {
        const id = req.params.id;
        try{
            await Note.findByIdAndRemove(id)
            res.redirect("/notes");
        } catch (e) {
            res.status(404).send({
                message: `could not delete the notes`,
            });
        }
        }
    
exports.create = async (req, res) => {

    try{

    const note = new Note({ Name: req.body.Name, Surname: req.body.Surname, Email: req.body.Email, Comment: req.body.Comment});
    await note.save();
        res.redirect('/notes/?message=new note detail was created')
    } catch (e) {
        if (e.errors) {
            console.log(e.errors);
            res.render('create-note',{errors: e.errors})
        }
        return res.status(400).send({
            message: JSON.parse(e),
        });

    }}

    exports.edit = async (req, res) => {
        const id = req.params.id;
        try{
            const note = await Note.findById(id);
            res.render('update-note', { note: note, id: id });
        } catch (e) {
            res.status(404).send({
              message: `could not find the note ${id}.`,
            });
          }
        };

        exports.update = async (req, res) => {
            const id = req.params.id;
            try {
                const note = await Note.updateOne({ _id: id}, req.body);
                res.redirect('/notes/?message = note was updated and edited succesfully');
            } catch (e) {
                res.status(404).send({
                  message: `could find the note ${id}.`,
                });
              }
            };