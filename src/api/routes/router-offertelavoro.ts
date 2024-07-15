import { Router } from 'express';
import OffertaLavoroController from '../controller/controller-offertelavoro';

const router: Router = Router();

router.post('/creare', OffertaLavoroController.createOfferta);
router.get('/lista', OffertaLavoroController.getOfferte);
router.put('/modifica/:offertaLavoroID', OffertaLavoroController.updateOfferta);
router.delete('/elimina/:offertaLavoroID', OffertaLavoroController.deleteOfferta);
router.post('/cerca', OffertaLavoroController.searchOfferte);


export default router;


