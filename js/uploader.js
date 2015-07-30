/**
 * Created by amanu on 7/30/15.
 *
 * Each uploader will be a table,
 * each row will represent an image upload task
 * each task can be saved, or deleted
 * after image is uploaded, image some id is received, and after
 *
 * Needed Components,
 *  a table,
 *  a row
 *  a data for additional columns
 *
 */
(function ($) {

    window.UploaderConfig = {
        max: 4,
        placeHolder: "../images/placeholder",
        addButton: '<a class="btn btn-sm btn-success uploader-add"  title="Add" href="javascript:void(0)">' +
        '<i class="fa fa-plus"></i></a>',
        saveAllButton: '<a class="btn btn-sm btn-primary uploader-save-all"  title="Save All" href="javascript:void(0)">' +
        '<i class="fa fa-save"></i></a>',
        removeAllButton: '<a class="btn btn-sm btn-danger uploader-remove-all" title="Remove All" href="javascript:void(0)">' +
        '<i class="fa fa-save"></i></a>',
        saveButton: '<a class="btn btn-sm btn-primary uploader-save"  href="javascript:void(0)">' +
        '<i class="fa fa-save"></i></a>',
        removeButton: '<a class="btn btn-sm btn-danger uploader-remove" href="javascript:void(0)">' +
        '<i class="fa fa-save"></i></a>',
        uploader: '<table class="table uploader">{{commandRow}}</table>',
        commandRow: '<tr class="uploader-command-row">' +
        '<td style="width:200px">{{addButton}} &nbsp; {{saveAllButton}} &nbsp; {{removeAllButton}}</td>' +
        '<td></td><td style="width:100px"></td></tr>',
        imageRow: '<tr>{{rowElements}}</tr>',
        imageContainer: '<td>{{image}}</td>',
        image: '<img class="img-responsive img-thumbnail"/>',
        inputContainer: '<td><div class="input-group input-group-sm">{{input}}</div></td>',
        textInput: '<input type="text" class="input-sm"/> ',
        numberInput: '<input type="number" class="input-sm"/> ',
        fileInput: '<div class="btn-file">' +
        '<a class="btn btn-sm btn-primary"><i class="fa fa-folder-open"></i> </a> ' +
        '<input type="file"/> </div> ',
        longTextInput: '<textarea></textarea> ',
        ckeditor: '<div contentEditable="true"></div>',
        set: function (settings) {
            this.max = settings.max || this.max;
            this.placeHolder = settings.placeHolder || this.placeHolder;
            this.addButton = settings.addButton || this.addButton;
            this.saveAllButton = settings.saveAllButton || this.saveAllButton;
            this.removeAllButton = settings.removeAllButton || this.removeAllButton;
            this.saveButton = settings.saveButton || this.saveButton;
            this.removeButton = settings.removeButton || this.removeButton;
        }
    };


}(jQuery));

