const axios = require('axios');

const services = {
    isJSON:(value) => {
        try {
            JSON.parse(value)
        } catch(e) {
            return false;
        };

        return true;
    },
    translateJSON: async (data, config) => {
        try {
            async function getValues(data, config) {
                return await new Promise(async (resolve) => {
                    for(const k of Object.keys(data)) {
                        const v = data[k];
    
                        if(v[Object.keys(v)[0]] && v[Object.keys(v)[0]].length > 1) {
                            await getValues(v, config);
    
                            if(Object.keys(data)[Object.keys(data).length - 1] == k) resolve(data); 
    
                            return;
                        };
                        
                        config.value = v;
    
                        const result =  typeof v == 'number' ? v :await services.translate(config);
        
                        data[k] = result; 
    
                        if(Object.keys(data)[Object.keys(data).length - 1] == k) resolve(data);                
                        
                    };
                });
                 // { "name": { "name" : "nome do teu chachorro", "age": "idade do teu cachorro", "humano": {"nome": "seu nome"}}}
            }
    
            const result = await getValues(data, config)
    
            return result;

        } catch(e) {
            return {
                data: 'error',
                message: 'Ops... Something happened!'
            };
        }
        
    },
    translate: async ({value, languageTranslate, languageTranslated}) => {
        const config = {
            method: 'get',
            url: `https://api.mymemory.translated.net/get?q=${value}&langpair=${languageTranslate}|${languageTranslated}`
        };

        const result = await axios(config);

        return result.data.responseData.translatedText;
    },
    init: async (e, args) => {
        try {
            let values = JSON.parse(args[0]);

            const config = {
                value: values.data, 
                languageTranslate: values.languageTranslate.short, 
                languageTranslated: values.languageTranslated.short
            };

            if(services.isJSON(values.data)) {
                const data = JSON.parse(values.data);

                const result = await services.translateJSON(data, config);

                console.log(result)

                e.reply('translate', JSON.stringify(result));
            } else {
                const result = await services.translate(config)

                e.reply('translate', result);
            };

        } catch(e) {
            console.log(e)
        };   
    }
};

module.exports = services;





// if(values.data.includes('{') && values.data.includes('}')) {
//     // it can start with {},
//     // the keys will have this model: key:
//     // the values will be (maybe) on "" or '',
//     // inside {} can have others {}

//     const data = {};


//     // console.log(JSON.parse(values.data))

//     // .split(/[\s{}]+/)

//     const checker = {
//         current: "",
//         type: undefined,
//         data: "",
//         key: "",
//         realPath: ""
//     };

//     const types = {
//         ':': "key",
//         '"': "value",
//         "'": "value",
//         "{": "object",
//         "}": "object",
//     };


//     forEach(values.data, (value, i) => {

//         // key ending  = :
//         // value staring ending = "" or ''
//         // Object starting ending = {}

//         // nome: {
//         //     nome: {
//         //         nome: {
//         //             nome: {}
//         //         }   
//         //     }
//         // }

//         // console.log(checker.data)

//         // console.log(value, types[value], checker.current)

//         // if(checker.current == "" && value != ' ') checker.current = types[value] ? types[value] : 'key';

        

//         // if(checker.current == types[value]) {
//         //     console.log(checker.current)
//         //     if(checker.current == 'key') checker.key += checker.key == "" ? checker.data : checker.data + '.';

//         //     if(checker.current == 'value') {
//         //         let dataKey = data;

//         //         forEach(checker.key.replace(/\s/g, '').split('.'), (k) => {
//         //             console.log(k)
//         //             dataKey += dataKey[k];
//         //         });


//         //         console.log(Object.keys(dataKey), '=========', checker.data)

//         //         dataKey = checker.data;
//         //     };
            
//         //     checker.type = undefined;
//         //     checker.current = "";
//         //     checker.data = "";

//         // }

//         // if(checker.current.length > 0) checker.data += value;
        

        

        
            

//         // if(i !== 0 && i !== values.data.length - 1 && value == '{') checker.current = "object";
        
//         // if(value == '"' || value == "'" &&
            
        

//         // if(i !== 0 && i !== values.data.length - 1 && value == '{') checker.current = "object";
        
//         // if(value == '"' || value == "'" && checker.current == value) {
//         //     checker.type = undefined;
//         //     checker.data = "";
//         // }
        
//         // if(value == '"' || value == "'" && !checker.type) {
//         //     checker.current = "value";
//         //     checker.type = value;
//         // };

//         // if(!checker.type) {
//         //     checker.current = 'key';
//         // }

//         // if(checker.current == 'value') {
//         //     checker.data += value;
//         // }





//         // console.log(value)
// //     })

    

// //     console.log(data)
// //     // var data = JSON.parse(values.data);
// //     // forEach(data, (value, key) => {
// //     //     console.log(value)

// //     // });

// //     return;
// // }

// // console.log(values.data.split('{'))



// // const result = await axios(config);


// // e.reply('translate', result.data);
