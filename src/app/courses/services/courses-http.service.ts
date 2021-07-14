import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Course} from '../model/course';
import {map} from 'rxjs/operators';

@Injectable()
export class CoursesHttpService {
    constructor(private http: HttpClient) {}
}
