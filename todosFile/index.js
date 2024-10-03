const fs = require('fs');
const {Command} = require('commander');

const program = new Command();
const file = 'todos.json';

const readFile = ()=> JSON.parse(fs.readFileSync(file,'utf8'));
const writeFile = (data)=> fs.writeFileSync(file,JSON.stringify(data,null,2));


program
    .name('todosInFile')
    .description('manage todos in ur files')
    .version('12.1.0');

program
    .command('add <todo>')
    .description('add a new todo')
    .action((todo)=>{
        const todos = readFile();
        todos.push({todo:todo,done:false});
        writeFile(todos);
        console.log(`Added ${todo}`);
    });

program
    .command('delete <index>')
    .description('add index to delete todo')
    .action((index)=>{
        const todos = readFile();
        if(index>=0 && index<todos.length){
            const removed = todos.splice(index,1);
            writeFile(todos);
            console.log(`Deleted ${removed[0].todo}`);
        }else{
            console.log(`Index ${index} is out of range`);
        }
    });

program
    .command('list')
    .description('show all todos')
    .action(()=>{
        const todos = readFile();
        todos.map((todo)=>{
            console.log(`${todo.todo}`);
            console.log(`isDone : ${todo.done}`);
        })
    });

program
    .command('done <index>')
    .description('Mark a to-do as done by index')
    .action((index)=>{
        const todos = readFile();
        if (index >= 0 && index < todos.length) {
            todos[index].done = true;
            writeFile(todos);
            console.log(`Marked as done: "${todos[index].todo}"`);
        } else {
            console.log(`Index ${index} is out of range`);
        }
    });

program.parse(process.argv);