const asyncHandler = require('express-async-handler');

const ApiError = require('../utils/ApiError');





exports.createCategory = (Model) => asyncHandler(async (req, res) => {



    const document = await Model.create(req.body)

    res.status(200).json({ data: document })

})


exports.getAll = (Model) => asyncHandler(async (req, res, next) => {
    // pagination 
    const page = req.query.page * 1 || 1
    const limit = req.query.limit * 1 || 5
    const skip = (page - 1) * limit

    const document = await Model.find({}).skip(skip).limit(limit)

    res.status(200).json({ result: document.length, data: document })
})




exports.updateOne = (Model) => asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const document = await Model.findByIdAndUpdate(id, req.body, { new: true })

    if (!document) {

        return next(new ApiError(`the is no category belong this id ${id}`, 400))
    }
    //trigger "save" event when update doc
    document.save()

    res.status(200).json({ data: document })
})




exports.deleteOne = (Model) => asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id)

    if (!document) {

        return next(new ApiError(`the is no category belong this id ${id}`, 400))
    }
    res.status(200).json({ data: document })
})




exports.getOne = (Model) => asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findById(id)

    if (!document) {
        return next(new ApiError(`No document for this id ${id}`, 404));
    }
    res.status(200).json({ data: document })
})