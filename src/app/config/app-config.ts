export class AppConfig {
    public baseUrl!: string;
    public protocol!: string;
    public remoteFile!: string;
    public microservices!: {
        login: {
            port: number        
        };
        dashboard: {
            port: number        
        };    
        admin: {
            port: number        
        };
    };

}