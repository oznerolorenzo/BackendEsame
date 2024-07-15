import { Request, Response } from 'express';
import OffertaLavoroService from '../service/service-offertelavoro';

class OffertaLavoroController {
  async createOfferta(req: Request, res: Response) {
    try {
      const { titolo, descrizioneBreve, retribuzioneLorda, dataInserimento } = req.body;
      if (!titolo || !descrizioneBreve || !retribuzioneLorda) {
        return res.status(400).json({ status: 'KO' });
      }

      const newOfferta = await OffertaLavoroService.createOfferta({
        titolo,
        descrizioneBreve,
        retribuzioneLorda,
        dataInserimento: dataInserimento ? dataInserimento.split('T')[0] : undefined
      });
      res.status(201).json({ status: 'OK' });
    } catch (error) {
      res.status(500).json({ status: 'KO' });
    }
  }

  async getOfferte(req: Request, res: Response) {
    try {
      const max: number = parseInt(req.query.max as string) || 10;
      if (isNaN(max) || max <= 0) {
        return res.status(400).json({ status: 'KO' });
      }

      const offerte = await OffertaLavoroService.getOfferte(max);
      res.status(200).json(offerte);
    } catch (error) {
      res.status(500).json({ status: 'KO' });
    }
  }

  async updateOfferta(req: Request, res: Response) {
    try {
      const offertaLavoroID = parseInt(req.params.offertaLavoroID);
      if (isNaN(offertaLavoroID)) {
        return res.status(400).json({ status: 'KO' });
      }

      const { titolo, descrizioneBreve, retribuzioneLorda, dataInserimento } = req.body;
      if (!titolo || !descrizioneBreve || !retribuzioneLorda) {
        return res.status(400).json({ status: 'KO' });
      }

      const updatedOfferta = await OffertaLavoroService.updateOfferta(offertaLavoroID, {
        titolo,
        descrizioneBreve,
        retribuzioneLorda,
        dataInserimento: dataInserimento ? dataInserimento.split('T')[0] : undefined
      });
      if (!updatedOfferta) {
        return res.status(404).json({ status: 'KO' });
      }
      res.status(200).json({ status: 'OK' });
    } catch (error) {
      res.status(500).json({ status: 'KO' });
    }
  }

  async deleteOfferta(req: Request, res: Response) {
    try {
      const offertaLavoroID = parseInt(req.params.offertaLavoroID);
      if (isNaN(offertaLavoroID)) {
        return res.status(400).json({ status: 'KO' });
      }

      const deletedOfferta = await OffertaLavoroService.deleteOfferta(offertaLavoroID);
      if (!deletedOfferta) {
        return res.status(404).json({ status: 'KO' });
      }
      res.status(200).json({ status: 'OK' });
    } catch (error) {
      res.status(500).json({ status: 'KO' });
    }
  }

  async searchOfferte(req: Request, res: Response) {
    try {
      const { query, max } = req.body;
      if (!query || !max || isNaN(max) || max <= 0) {
        return res.status(400).json({ status: 'KO' });
      }

      const offerte = await OffertaLavoroService.searchOfferte(query, max);
      res.status(200).json(offerte);
    } catch (error) {
      res.status(500).json({ status: 'KO' });
    }
  }
}

export default new OffertaLavoroController();
