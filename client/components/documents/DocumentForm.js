import React, { PropTypes } from 'react';
import TextInput from '../common/TextInput';
import TextEditor from '../common/TextEditor';
import SelectInput from '../common/SelectInput';
import options from '../../data/options';

const DocumentForm = (
  {
    documents,
    onSave,
    onChange,
    clearError,
    loading,
    errors,
    labelclass,
    editorChange
  }
) => {
  return (
    <div>
    <form className="col s12" onSubmit={onSave} method="post">
              <div className="row">
                <TextInput
                id="title"
                type="text"
                name="title"
                className="input-field col m12 s12"
                onChange={onChange}
                onFocus={clearError}
                value={documents.title}
                error={errors.title}
                label="Title"
                labelclass={labelclass}
                />
                </div>
                <div className="row">
                <TextEditor
                error={errors.content}
                onFocus={clearError}
                document={documents}
                onChange={editorChange} />
              </div>
              <div className="row">
                <SelectInput
                id="access"
                name="access"
                onChange={onChange}
                onFocus={clearError}
                options={options}
                error={errors.access}
                value={documents.access}
                label="Privacy"
                />
              </div>
            <button
            id="create-btn"
          type="submit"
          name="btn_login"
          className="col s12 btn btn-large waves-effect light-reddish darken-3"
          disabled={loading}
        >
            Post
          </button>
      </form>
      </div>
  );
};

DocumentForm.propTypes = {
  createDocument: PropTypes.func,
  documents: PropTypes.object,
  onSave: PropTypes.func,
  onChange: PropTypes.func,
  loading: PropTypes.bool,
  errors: PropTypes.object,
  clearError: PropTypes.func,
  labelclass: PropTypes.string,
  editorChange: PropTypes.func
};
export default DocumentForm;
