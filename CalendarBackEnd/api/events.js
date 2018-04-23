const router = require('express').Router()
const {_Event} = require('../db/models')

router.get('/:year-:month', async (req ,res ,next) => {
   
    let month = +req.params.month
    let preMonth = month - 1 ;
    let nextMonth = month + 1;

    let year = +req.params.year;
    let preYear = year;
    let nextYear = year;
    
    if( preMonth === 0 ) {
        preMonth = 12;
        preYear --
    }
    if(nextMonth === 13){
        nextMonth = 1;
        nextYear ++
    }
    let app1 = await _Event.findAll({
        where: {
            year : year,
            month : month}})
            .catch(next)
    let app2 = [];
    if(preYear!==0) {
        app2 = await _Event.findAll({
        where: {
            year : preYear,
            month : preMonth}})
            .catch(next)
        }
    let app3 = await _Event.findAll({
        where: {
            year: nextYear,
            month: nextMonth
        }
    }).catch(next)

    let events = app1.concat(app2,app3)
    
    res.json(events)
})


router.post('/',  (req ,res ,next) => {
    _Event.create(req.body)
    .then((event)=> res.json(event))
})

//Was thinking of making updates possible but creating and deleting seemed fine enough
router.put('/:id', (req ,res ,next) => {
    _Event.findOne({
        where: {
        id: req.params.id
    }})
    .then(event => {
        appontment.update(req.body)
    })
    .then(()=>{
        res.sendStatus(200)
    })
    .catch(next)
})

router.delete('/:id', (req ,res ,next) => {
    _Event.findOne({
        where: {
            id : req.params.id }})
            .then(event => {
               event.destroy()
            })
            .then(()=> res.sendStatus(200))
            .catch(next)
})





module.exports = router