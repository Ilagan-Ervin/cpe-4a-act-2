import fs from 'fs';  
import qr from 'qr-image';
import generateStupidName from 'sillyname';
import {randomSuperhero} from 'superheroes';
import inquirer from 'inquirer';

inquirer 
.prompt([{
    message: 'who you?',
    name: "nem"
}])

.then((answers) => {
    var SN = generateStupidName();
    var SHN = randomSuperhero();
    var qr_nem = qr.image(answers.nem, {type: 'png'});
    var qr_SN = qr.image(SN, {type: 'png'});
    var qr_SHN = qr.image(SHN, {type: 'png'});

    const content = `your name is ${answers.nem}\nand your silly name is ${SN}\nand your super hero name is ${SHN}`;

    qr_nem.pipe(fs.createWriteStream('nem.png'));
    qr_SN.pipe(fs.createWriteStream('SN.png'));
    qr_SHN.pipe(fs.createWriteStream('SHN.png'));

    fs.writeFileSync('content.txt', content);

    console.log(content);
});