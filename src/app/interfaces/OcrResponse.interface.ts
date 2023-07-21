export interface OcrResponse {
    ParsedResults:                ParsedResult[];
    OCRExitCode:                  number;
    IsErroredOnProcessing:        boolean;
    ProcessingTimeInMilliseconds: string;
    SearchablePDFURL:             string;
}

export interface ParsedResult {
    TextOverlay:       TextOverlay;
    TextOrientation:   string;
    FileParseExitCode: number;
    ParsedText:        string;
    ErrorMessage:      string;
    ErrorDetails:      string;
}

export interface TextOverlay {
    Lines:      any[];
    HasOverlay: boolean;
    Message:    string;
}