import React from 'react';

const MemberForm = () => {
  return (
    <div className="mb-4">
      <h3>Add New Member</h3>
      <form>
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" placeholder="Enter member name" />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" placeholder="Enter email" />
        </div>
        <button type="submit" className="btn btn-primary">Add Member</button>
      </form>
    </div>
  );
};

export default MemberForm;