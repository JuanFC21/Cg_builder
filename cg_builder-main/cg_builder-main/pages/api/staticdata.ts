import fsPromises from 'fs/promises';
import path from 'path'


export default async function handler (req:any,res:any) {
    const filePath = path.join(process.cwd(), '/games/red_flags_sf.json');

    const jsonData = await fsPromises.readFile(filePath, 'utf-8');
    const objectData = JSON.parse(jsonData);
    
    res.status(200).json(objectData);

}



