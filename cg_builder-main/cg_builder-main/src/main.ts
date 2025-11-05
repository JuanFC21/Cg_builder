import fsPromises from 'fs/promises';
import path from 'path'


export default async function getStaticProps() {
    const filePath = path.join(process.cwd(), '/games/red_flags.json');

    const jsonData = await fsPromises.readFile(filePath, 'utf-8');
    const objectData = JSON.parse(jsonData);
    return objectData
}



