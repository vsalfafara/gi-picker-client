import { GoogleSpreadsheet } from 'google-spreadsheet';
import * as creds from '../../secrets.json'

const doc = new GoogleSpreadsheet('1wywxSwLmt0c5UA5DN3dsXfuDq0R4cm1J0xsq4EVgQY4')

await doc.useServiceAccountAuth(creds)

export default doc

