import mongoose, { Schema, Document } from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose);

interface IOffertaLavoro extends Document {
  offertaLavoroID: number;
  titolo: string;
  descrizioneBreve: string;
  dataInserimento: Date;
  retribuzioneLorda: number;
}

const offertaLavoroSchema: Schema = new Schema({
  offertaLavoroID: { type: Number, unique: true, autoIncrement: true },
  titolo: { type: String, required: true },
  descrizioneBreve: { type: String, required: true },
  dataInserimento: { type: Date, default: Date.now },
  retribuzioneLorda: { type: Number, required: true },
}, {
  collection: 'TOfferteLavoro'
});

offertaLavoroSchema.plugin(AutoIncrement, { inc_field: 'offertaLavoroID' });

export default mongoose.model<IOffertaLavoro>('OffertaLavoro', offertaLavoroSchema);
