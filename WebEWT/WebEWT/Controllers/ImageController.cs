using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Xml;
using WebEWT.Models;

namespace WebEWT.Controllers
{
    public class ImageController : Controller
    {
        public ActionResult UploadImage()
        {
            return View();
        }

        public ActionResult Gallery()
        {
            ViewBag.ImagesJSON = GetImages();
            return View();
        }

        private string getName(string oldName, string newName)
        {
            return newName.Length == 0 ? oldName : (newName + oldName.Substring(oldName.LastIndexOf(".")));
        }

        public ActionResult AddImage(HttpPostedFileBase file, string fileName)
        {
            var path = getPathToImg(getName(file.FileName, fileName));
            file.SaveAs(path);
            return RedirectToAction("Index", "Home");
        }

        public JsonResult DeleteImage(string nameImage)
        {
            var path = getPathToImg(nameImage);
            System.IO.File.Delete(path);
            return Json(true, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AddImageAjax(string fileName, string fileData, string newName)
        {
            var dataIndex = fileData.IndexOf("base64", StringComparison.Ordinal) + 7;
            var cleareData = fileData.Substring(dataIndex);
            var fileInformation = Convert.FromBase64String(cleareData);
            var bytes = fileInformation.ToArray();

            var path = getPathToImg(getName(fileName, newName));
            var fileStream = System.IO.File.Create(path);

            fileStream.Write(bytes, 0, bytes.Length);
            fileStream.Close();
            return Json(true, JsonRequestBehavior.AllowGet);
        }

        private string getPathToImg(string fileName)
        {
            var serverPath = Server.MapPath("~");
            return Path.Combine(serverPath, "Content", "img", fileName);
        }

        [HttpPost]
        public JsonResult GetImages()
        {
            var serverPath = Server.MapPath("~");
            var pathToImageFolder = Path.Combine(serverPath, "Content", "img");
            var imageFiles = Directory.GetFiles(pathToImageFolder);
            var imgesUrl = imageFiles.Select(buildImage);
            //  JavaScriptSerializer serializer = new JavaScriptSerializer();
            // return serializer.Serialize(imges);
            return Json(imgesUrl, JsonRequestBehavior.AllowGet);
        }

        private string buildImage(string path)
        {
            var fileName = Path.GetFileName(path);
            var url = Url.Content("~/Content/img/" + fileName);
            return url;
        }
    }
}