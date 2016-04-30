import libRequestChecker from 'libs/requestChecker';
import Router from 'express-promise-router';

export default (DI, parentRouter, app) => {

  const contestService = DI.get('contestService');

  const router = Router();
  parentRouter.use(
    '/contests',
    libRequestChecker.enforceRole(['ADMIN']),
    router
  );

  router.get('/',
    async (req, res) => {
      const contests = await contestService.getContests();
      res.json(contests);
    }
  );

  router.post('/',
    contestService.checkBodyForCreateOrEdit,
    libRequestChecker.raiseValidationErrors,
    async (req, res) => {
      const contest = await contestService.createContest(req.body);
      res.json(contest);
    }
  );

  router.get('/:id',
    async (req, res) => {
      const contest = await contestService.getContestObjectById(req.params.id);
      res.json(contest);
    }
  );

  router.put('/:id',
    contestService.checkBodyForCreateOrEdit,
    libRequestChecker.raiseValidationErrors,
    async (req, res) => {
      const contest = await contestService.updateContest(req.params.id, req.body);
      res.json(contest);
    }
  );

};
