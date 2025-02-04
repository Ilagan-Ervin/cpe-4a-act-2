import fs from 'fs';  
import qr from 'qr-image';
import generateStupidName from 'sillyname';
import {randomSuperhero} from 'superheroes';
import inquirer from 'inquirer';

inquirer 
.prompt([{
    message: 'who are you?',
    name: "name"
}])

.then((answers) => {
    var sillyname  = generateStupidName();
    var superheroname = randomSuperhero();
    var qr_name = qr.image(answers.name, {type: 'png'});
    var qr_sillyname = qr.image(sillyname, {type: 'png'});
    var qr_superheroname = qr.image(superheroname, {type: 'png'});

    const content = `your name is ${answers.name}\nand your villain name is ${sillyname}\nand your superhero name is ${superheroname}`;

    qr_name.pipe(fs.createWriteStream('name.png'));
    qr_sillyname.pipe(fs.createWriteStream('sillyname.png'));
    qr_superheroname.pipe(fs.createWriteStream('superheroname.png'));

    fs.writeFileSync('myhero.txt', content);

    console.log(content)
    console.log('QR codes for your name, villain name and superhero name is generated');
    console.log('myhero.txt is updated')
});