import exp from 'constants';
import { SaveFile } from './save-file.use-case';
import fs from 'fs';


describe('SaveFileUseCase', () => {

    const customOptions = {
        fileContent: 'custom-content',
        fileDestination: 'custom-outputs/file-destination',
        fileName: 'custom-table-name'
    }

    const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;

    afterEach( () => {
        const outputFolderExist = fs.existsSync('outputs');
        if (outputFolderExist) fs.rmSync('outputs', { recursive: true });

        const customOutputFolderExist = fs.existsSync(customOptions.fileDestination);
        if (customOutputFolderExist ) fs.rmSync(customOptions.fileDestination, { recursive: true });
        
    })

    test('should save file with default values', () => {

        const saveFile = new SaveFile();
        const filePath = 'outputs/table.txt';
        const options = {
            fileContent: 'Test content'
        }

        const result = saveFile.execute(options)

        const fileExist = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8'})

        expect( result ).toBe(true);
        expect( fileExist ).toBe(true);
        expect( fileContent).toBe( options.fileContent )

    });

    test('should save file with custom values',  () => {
        
        const saveFile = new SaveFile();
        const result = saveFile.execute(customOptions);
        const fileExist = fs.existsSync(customFilePath);
        const fileContent = fs.readFileSync(customFilePath, { encoding: 'utf-8'});

        expect( result ).toBe(true);
        expect( fileExist ).toBe(true);
        expect( fileContent ).toBe( customOptions.fileContent );
    });

    test('sould return false if directory could not be created', () => {

        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => { throw new Error('Error generat desde testing'); }
        );

        const result = saveFile.execute(customOptions)
        expect( result ).toBe( false )
        mkdirSpy.mockRestore();

    })

    test( 'should return false if file could not be created', () => {

        const saveFile = new SaveFile();
        const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            () => {throw new Error( 'Error en la grabació del arxiu');}
        )
        const result = saveFile.execute({ fileContent: 'Hola'})

        expect( result ).toBe(false);
        writeFileSpy.mockRestore();


    })
    


});