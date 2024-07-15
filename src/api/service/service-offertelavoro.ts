import OffertaLavoro from '../model/model-offertelavoro';

class OffertaLavoroService {
  async createOfferta(data: { titolo: string; descrizioneBreve: string; retribuzioneLorda: number; dataInserimento?: string }) {
    if (!data.dataInserimento) {
      data.dataInserimento = new Date().toISOString().split('T')[0]; // Solo la data senza l'ora
    }
    const offerta = new OffertaLavoro(data);
    return offerta.save();
  }

  async getOfferte(max: number) {
    return OffertaLavoro.find().sort({ dataInserimento: -1 }).limit(max);
  }

  async getOffertaById(offertaLavoroID: number) {
    return OffertaLavoro.findOne({ offertaLavoroID });
  }

  async updateOfferta(offertaLavoroID: number, data: { titolo: string; descrizioneBreve: string; retribuzioneLorda: number; dataInserimento?: string }) {
    if (!data.dataInserimento) {
      data.dataInserimento = new Date().toISOString().split('T')[0]; // Solo la data senza l'ora
    }
    return OffertaLavoro.findOneAndUpdate({ offertaLavoroID }, data, { new: true });
  }

  async deleteOfferta(offertaLavoroID: number) {
    return OffertaLavoro.findOneAndDelete({ offertaLavoroID });
  }

  async searchOfferte(query: string, max: number) {
    return OffertaLavoro.find({
      $or: [
        { titolo: new RegExp(query, 'i') },
        { descrizioneBreve: new RegExp(query, 'i') }
      ]
    })
      .sort({ dataInserimento: -1 })
      .limit(max);
  }
}

export default new OffertaLavoroService();
